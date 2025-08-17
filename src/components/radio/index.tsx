const Radio = (props: {
  checked?: boolean;
  id?: string;
  name?: string;
}) => {
  const { checked, id, name, ...rest } = props;

  return (
    <input
      id={id}
      name={name}
      type="radio"
      checked={checked}
      className={`before:content[""] relative h-5 w-5 cursor-pointer appearance-none rounded-full
        border !border-gray-200 transition-all duration-[0.2s] before:absolute before:top-[3px]
        before:left-[50%] before:h-3 before:w-3 before:translate-x-[-50%] before:rounded-full before:transition-all before:duration-[0.2s] dark:!border-gray-800
        checked:!border-[#294B29] checked:before:!bg-[#294B29] dark:checked:!border-[#294B29] dark:checked:before:!bg-[#294B29]
      `}
      {...rest}
    />
  );
};

export default Radio;
