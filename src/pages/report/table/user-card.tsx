import { minio_img_url } from "@/constants";

type UserData = {
  status: string;
  closer?: {
    avatar: {
      path: string;
    } | null;
  };
  closer_m?: {
    avatar?: {
      path?: string;
    } | null;
  };
  filial?: {
    cashiers: {
      avatar: {
        path: string;
      };
    }[];
  };
};

const UserCard = ({ data }: { data: UserData }) => {
  return (
    <>
      {data.status !== "open" && (
        <div className="flex space-x-[-7px]">
          <div className="relative w-10 h-10  ">
            <img
              src={
                minio_img_url +
                (data.closer?.avatar?.path ||
                  data.filial?.cashiers[0]?.avatar?.path ||
                  "")
              }
              alt=""
              className="w-10 h-10 object-cover rounded-full border-2 border-[#E6E6D9]"
            />
            <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-[2px]">
              <img
                src={
                  data.status
                    ? "./images/table/check.png"
                    : "./images/table/uncheck.png"
                }
                alt="status"
                className="w-[12px] h-[12px]"
              />
            </div>
          </div>

          {data.closer_m && (
            <div className="relative w-10 h-10 z-0 z-[5]">
              <img
                src={minio_img_url + (data.closer_m.avatar?.path || "")}
                alt=""
                className="w-10 h-10 object-cover rounded-full border-2 border-[#E6E6D9]"
              />
              <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-[2px]">
                <img
                  src={
                    data.status
                      ? "./images/table/check.png"
                      : "./images/table/uncheck.png"
                  }
                  alt="status"
                  className="w-[12px] h-[12px]"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserCard;
