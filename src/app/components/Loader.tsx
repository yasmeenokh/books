import Icon from "./Icon";

export default function Loader() {
  return (
    <div className="relative h-[65dvh] flex items-center">
      <Icon
        id="spinner"
        className=" block w-[10vw] h-[10dvh] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto"
      />
    </div>
  );
}
