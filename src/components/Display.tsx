import React from "react";
import { SearchBar, CustomFilter, CarCard, Showmore } from ".";
import { fetchCars } from "@/utils";
import { CarProps, FiltersProps, SearchParamsProps } from "@/types";
import { fuels, yearsOfProduction } from "@/contants";

const Display = async ({
  allCars,
  searchParams,
}: //
{
  allCars: CarProps[];
  searchParams: FiltersProps;
}) => {
  console.log("******Enter Display*****");

  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   model: searchParams.model || "",
  //   year: searchParams.year || 2022,
  //   limit: searchParams.limit || 10,
  //   fuel: searchParams.fuel || "",
  // });

  const isDataEmpty =
    !allCars || allCars.length === 0 || !Array.isArray(allCars);

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catelogue</h1>
        <p>Explore cars you might like</p>
      </div>

      <div className="home__filters">
        <SearchBar />

        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>

      {isDataEmpty ? (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
      ) : (
        <section>
          <div className="home__cars-wrapper">
            {allCars.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
          <Showmore
            pageNumber={(searchParams?.limit || 10) / 10}
            hasNext={(searchParams?.limit || 10) > allCars.length}
          />
        </section>
      )}
    </div>
  );
};

export default Display;
