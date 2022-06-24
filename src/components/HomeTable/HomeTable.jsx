import { getCategories } from "../../utilities/utilities";

export default function HomeTable({ data, selected }) {
  const headers = data.length > 0 ? getCategories(data[0]) : [];
  return (
    <>
      <div className="home__table_header row">
        <div>Risk</div>
        {headers.map((value, index) => (
          <div key={index}>{value} %</div>
        ))}
      </div>
      {data.map((level) => (
        <div
          key={level.id}
          className={
            level.risk == selected
              ? "home__table_item row selected"
              : "home__table_item row"
          }
        >
          <div> {level.risk}</div>
          {level.categories.map((categorie, index) => (
            <div key={index}>{categorie.value}</div>
          ))}
        </div>
      ))}
    </>
  );
}
