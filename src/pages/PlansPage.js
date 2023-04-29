import React, { useEffect, useState } from "react";
import "./PlansPage.css";
import db from "../firebase";
import {
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxData/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansPage() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  const [currentSub, setCurrentSub] = useState([null]);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      const { error, sessionId } = snapshot.data();

      if (error) {
        alert(`An error has occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51N1vl6GUy30GPbDtbn1xLJY0z1JiafEvmN1xPZ9MWracnl3A5UOXAMcRmcV0z2RHk50esOu5t8aZIKDrK5dBEXMd00cyxfCN4E"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const customerSubsRef = collection(
      db,
      "customers",
      user.uid,
      "subscriptions"
    );
    const unsubscribe = onSnapshot(customerSubsRef, (querySnapshot) => {
      querySnapshot.forEach((sub) => {
        setCurrentSub({
          role: sub.data().role,
          current_period_end: sub.data().current_period_end.seconds,
          current_period_start: sub.data().current_period_start.seconds,
        });
      });
    });

    return () => {
      unsubscribe();
    };
  }, [db, user.uid]);

  useEffect(() => {
    const dbData = collection(db, "products");
    const unsubscribe = onSnapshot(dbData, async (snapshot) => {
      let productsData = {};
      for (const doc of snapshot.docs) {
        const { name, description, metadata } = doc.data();
        const pricesQuery = query(
          collection(db, "products", doc.id, "prices"),
          where("active", "==", true)
        );
        const pricesSnapshot = await getDocs(pricesQuery);
        const pricesData = {};
        for (const doc of pricesSnapshot.docs) {
          const priceData = doc.data();
          const priceId = doc.id;
          pricesData[priceId] = {
            priceId,
            priceData,
          };
        }
        productsData[doc.id] = {
          name,
          description,
          metadata,
          prices: pricesData,
        };
      }
      setProducts(productsData);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="plans_page">
      {currentSub && (
        <p>
          Renewal Date:{" "}
          {new Date(currentSub?.current_period_end * 1000).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const activeSub = productData.name
          ?.toLowerCase()
          .includes(currentSub?.role);

        return (
          <div
            key={productId}
            className={`${activeSub && "plan_page_grey"} plan_page_each`}
          >
            <div className="plan_page_each_info">
              <h5> {productData.name}</h5>
              <h6> {productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !activeSub &&
                loadCheckout(Object.values(productData.prices)[0].priceId)
              }
            >
              {activeSub ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansPage;
