import { useState } from "react";
import "./styles.css";

interface Country {
  name: string;
  selected: boolean;
  id: number;
}

const countriesData: Country[] = [
  { id: 0, name: "Select All", selected: false },
  { id: 1, name: "Country 1", selected: false },
  { id: 2, name: "Country 2", selected: false },
  { id: 3, name: "Country 3", selected: false },
];

export default function App() {
  const [countries, setCountries] = useState<Country[]>(countriesData);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleCountryToggle = (id: number) => {
    const countryData = countries.find((country) => country.id === id);
    if (countryData?.name === "Select All") {
      const newSelectAll = !selectAll;
      const newCountries = countries.map((country) => ({
        ...country,
        selected: newSelectAll,
      }));
      setCountries(newCountries);
      setSelectAll(newSelectAll);
    } else {
      const newCountrySelected = countries.map((country) => {
        if (country.name === countryData?.name) {
          return { ...country, selected: !country.selected };
        } else {
          return { ...country };
        }
      });

      setCountries(newCountrySelected);
      const toggleSelectAll =
        newCountrySelected.filter(
          (country) => country.selected && country.name !== "Select All"
        ).length ===
        countries.length - 1;
      setSelectAll(toggleSelectAll);
    }
  };

  return (
    <div className="App">
      <ul>
        {countries.map(({ name, selected, id }) => (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                checked={name === "Select All" ? selectAll : selected}
                onChange={() => handleCountryToggle(id)}
              />
              {name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
