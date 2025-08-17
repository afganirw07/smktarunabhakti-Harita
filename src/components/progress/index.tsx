const Progress = (props: {
  value: number;
  width?: string;
}) => {
  const { value, width } = props;

  return (
    <div
      className={`h-2 ${width ? width : "w-full"} rounded-full bg-gray-200 dark:bg-navy-700`}
    >
      <div
        className="flex h-full items-center justify-center rounded-full bg-[#294B29] dark:bg-[#294B29]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
