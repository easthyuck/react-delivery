import { useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState } from "react/cjs/react.development";
import axios from "axios";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(undefined);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-c930c-default-rtdb.firebaseio.com/meals.json"
        //올바르지 않은 url을 호출하여 강제 error발생 가능
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    // axios 사용 예제
    // axios
    //   .get("https://react-http-c930c-default-rtdb.firebaseio.com/meals.json")
    //   .then((Response) => {
    //     const loadedMeals = [];

    //     for (const key in Response.data) {
    //       loadedMeals.push({
    //         id: key,
    //         name: Response.data[key].name,
    //         description: Response.data[key].description,
    //         price: Response.data[key].price,
    //       });
    //     }

    //     setMeals(loadedMeals);
    //   })
    //   .catch((Error) => {
    //     setHttpError(Error);
    //   });
    // setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.MealsError}>failed to API</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Card className={classes.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
