"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { hall } from "@/lib/utils";
import Image from "next/image";
import UpdateRole from "../../components/UpdateRole";

const Admin = () => {
  const [searchName, setSearchName] = useState("");
  const users = useQuery({
    queryKey: ["users", searchName],
    queryFn: async () => {
      const response = await axios.get(`/api/user?search=${searchName}`);
      return response.data;
    },
  });

  return (
    <section className="w-full">
      <h1 className="text-center text-4xl font-extrabold my-10">
        Wellcome to Admin Panel
      </h1>
      <h2 className="text-center text-3xl font-bold my-10">All Students</h2>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <input
          className="input input-bordered w-44"
          type="text"
          placeholder="Search By Name"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto mx-5 lg:mx-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Edit Info</th>
              <th>Name & Home</th>
              <th>Roll & Hall</th>
              <th>Session</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.isLoading && (
              <tr>
                <td>
                  <span className="loading loading-infinity loading-sm"></span>
                </td>
                <td>
                  <span className="loading loading-infinity loading-sm"></span>
                </td>
                <td>
                  <span className="loading loading-infinity loading-sm"></span>
                </td>
                <td>
                  <span className="loading loading-infinity loading-sm"></span>
                </td>
              </tr>
            )}
            {users.data?.map((user) => (
              <tr key={user._id} className="hover">
                <td>
                  <Link href={`/update-user/${user._id}`}>
                    <button className="btn btn-sm btn-warning">Edit</button>
                  </Link>
                </td>
                <td>
                  <Link href={`/student/${user._id}`}>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            height={48}
                            width={48}
                            src={user.imgUrl || "https://i.pravatar.cc/300"}
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">
                          {user.homeTown}
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>

                <td>
                  {user.roll}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {hall[user.hallCode]}
                  </span>
                </td>
                <td>{user.session}</td>
                <th>
                  <UpdateRole userInfo={user} refetch={users.refetch} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Admin;
