"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "../libs/utils";
import { FoodReducedType, FoodType } from "../types/food";

const ComboBox = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [foods, setFoods] = useState<FoodReducedType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const BoxRef = useRef<HTMLDivElement>(null);

  const fetchFoods = async () => {
    try {
      const response = await fetch("/api/foods");
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        const foodsReduced: FoodReducedType[] = data.map((food: FoodType) => ({
          value: food.name.toLowerCase().replace(/ /g, "-"),
          label: food.name,
        }));
        setFoods(foodsReduced);
      } else {
        throw new Error("Invalid JSON response");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const initialize = async () => {
      await fetchFoods();
      setIsLoading(false);
    };
    initialize();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (BoxRef.current && !BoxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // useEffect(() => {
  //   value.length > 0 ? router.push(`../food/${value}`) : null
  // }, [value])
  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center bg-slate-950",
      )}
    >
      {!isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-5xl font-extrabold text-white">
            Welcome to <span className="title_colored">Nutrispark</span>
          </h1>

          <p className="mb-8 max-w-2xl text-center text-lg text-white">
            Discover the nutritional values of your favorite foods. Use the
            search below to get started
          </p>
          <div ref={BoxRef} className="w-60">
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`../food/${value}`);
              }}
            >
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className={cn(
                  "w-full rounded-md border border-slate-700 bg-slate-950 p-4 text-slate-50",
                )}
                placeholder="Search for food..."
              />
              <button
                type="submit"
                onClick={() => {
                  router.push(`../food/${value}`);
                }}
                className="ml-2 rounded-lg border border-slate-700 bg-slate-950 p-4 text-slate-50 focus:border-slate-50"
              >
                <Search />
              </button>
            </form>
            {isOpen && !isLoading && (
              <ul className="mt-2 max-h-40 w-full overflow-y-auto rounded-md border border-slate-300 bg-slate-950 text-white">
                {foods.length > 0 ? (
                  foods
                    .filter((food) =>
                      food.label.toLowerCase().includes(value.toLowerCase()),
                    )
                    .map((food, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setValue(food.label);
                          setIsOpen(false);
                          router.push(`../food/${food.value}`);
                        }}
                        className="cursor-pointer p-2 text-xl hover:bg-slate-700"
                      >
                        {food.label}
                      </li>
                    ))
                ) : (
                  <li className="text-xl">Aucun Résultat</li>
                )}
              </ul>
            )}
            {isLoading && (
              <p className="mt-2 flex items-center justify-center">
                Loading...
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center bg-slate-950">
          <p className="text-4xl text-slate-50">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default ComboBox;
