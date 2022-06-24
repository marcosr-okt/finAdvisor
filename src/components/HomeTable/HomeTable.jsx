import { getCategories } from "../../utilities/utilities";

export default function HomeTable({ data, selected }) {
  const headers = data.length > 0 ? getCategories(data[0]) : [];
  return (
    <>
      <div className="table_header row">
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
              ? "row active"
              : "row"
          }
        >
          <div> {level.risk}</div>
          {level.categories.map((category, index) => (
            <div key={index}>{category.value}</div>
          ))}
        </div>
      ))}
    </>
  );
}
