import { minio_img_url } from "@/constants";

const UserCard = ({
  data,
}: {
  data: {
    status: string;
    closer: {
      avatar: {
        path: string;
      } | null;
    };
  };
}) => {
  return (
    <>
      {data.status != "open" && (
        <div className="relative w-10 h-10">
          <img
            src={minio_img_url + data.closer?.avatar?.path || ""}
            alt={""}
            className={`w-10 h-10 object-cover rounded-full border-2 der-red-400 border-[]`}
          />
          <div className="absolute -bottom-0 -left-0 bg-white rounded-full text-xs">
            {data.status ? (
              <span className="text-green-500 text-sm">
                <img
                  src={"./images/table/check.png"}
                  alt={"./images/table/check.png"}
                  className={`w-[12px] h=[12px]`}
                />
              </span>
            ) : (
              <span className="text-red-400 text-sm">
                <img
                  src={"./images/table/uncheck.png"}
                  alt={"./images/table/check.png"}
                  className={`w-[12px] h=[12px]`}
                />
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
