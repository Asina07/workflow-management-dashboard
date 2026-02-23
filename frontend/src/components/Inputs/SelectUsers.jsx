import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUsers } from "react-icons/lu";
import Modal from "../layouts/Modal";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers = [], setSelectedUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, SetModalOpen] = useState(false);
  const [tempSeelctedUsers, SetTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error Fetching Users!", error);
    }
  };

  const toggleUserSelection = (userId) => {
    SetTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };
// console.log('temuse',tempSeelctedUsers)
  const handleAssing = () => {
    setSelectedUser(tempSeelctedUsers);
    SetModalOpen(false);
  };

  const selectUserAvatar = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      SetTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectUserAvatar.length === 0 && (
        <button className="card-btn" onClick={() => SetModalOpen(true)}>
          <LuUsers className="text-sm" />
          Add Members
        </button>
      )}
      {selectedUsers.length > 0 && (
        <div className="cursor-pointer" onClick={() => SetModalOpen(true)}>
          <AvatarGroup avatars={selectUserAvatar} maxVisible={4} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => SetModalOpen(false)}
        title={"Selected Users"}
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-200"
            >
              <img
                src={user?.profileImageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSeelctedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button className="card-btn" onClick={() => SetModalOpen(false)}>
            Cancel
          </button>
          <button
            type="button "
            className="card-btn-fill"
            onClick={handleAssing}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
