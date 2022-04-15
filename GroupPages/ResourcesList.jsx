import Resources from "./Resources";

export default function ResourcesList(prop) {
  return (
    <div style={{ height: "80vh" }}>
      {prop.list.map((item) => (
        //
        <Resources link={item}></Resources>
      ))}
      {console.log(prop.list)}
    </div>
  );
}


