import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  // add todo (works for button + Enter)
  const handleAddOption = () => {
    if (!option.trim()) return;

    setTodoList([...todoList, option.trim()]);
    setOption("");
  };

  // handle form submit (Enter key)
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddOption();
  };

  // delete todo
  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {/* INPUT + ADD */}
      <form onSubmit={handleSubmit} className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task Here"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />

        <button type="submit" className="card-btn text-nowrap">
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </form>
      {/* TODO LIST */}
      {todoList?.length > 0 &&
        todoList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-4"
          >
            <p className="text-xs text-black">
              <span className="text-xs text-gray-400 font-semibold mr-2">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              {item}
            </p>

            <button
              type="button"
              className="cursor-pointer"
              onClick={() => handleDeleteOption(index)}
            >
              <HiOutlineTrash className="text-lg text-red-500" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default TodoListInput;
