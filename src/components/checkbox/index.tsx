const Checkbox = (props: {
  id?: string;
  extra?: string;
  [x: string]: any;
}) => {
  const { extra, id, ...rest } = props;

  return (
    <input
      id={id}
      type="checkbox"
      className={`defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10
      checked:bg-[#294B29] dark:checked:bg-[#294B29] ${extra}`}
      name="weekly"
      {...rest}
    />
  );
};

export default Checkbox;
