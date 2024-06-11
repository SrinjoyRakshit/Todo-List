import { React, useState, useEffect } from "react";

const getLocalitem = () => {
  let list =  localStorage.getItem('lists')
  if(list){
    return  JSON.parse(list)
  }
  else{
    return []
  }
}

function Todoinput() {
  const [text, setText] = useState("add task");
  const [task, setTask] = useState(getLocalitem());

  const changeText = (e) => {
    setText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setTask([...task, text]);
    setText("");
  };

  const deleteTask = (a) => {
    const finalData = task.filter((currElem, index) => {
      return index !== a
    })

    setTask(finalData)
  }

  const checked = () => {
    console.log("checked");
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(task))
  }, [task])

  return (
    <>
      <form
        className="flex items-start justify-between gap-5"
        onSubmit={submitHandler}
      >
        <input
          className="px-3 py-1.5 rounded-lg outline-none text-xl text-black border-[1px] border-black"
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={changeText}
        />
        <button
          type="submit"
          className="px-3 py-2 bg-orange-500 text-black text-xl rounded-lg"
        >
          Add Task
        </button>
      </form>

      <div className="container">
        {task.map((value, index) => {
          return (
            <div className="flex items-start justify-between mt-10">
              <h2 className="flex flex-row gap-3 text-xl bg-transparent border-[1px] border-red-600 px-3 py-2 rounded-lg">
                <input type="checkbox"
                onClick={checked}
                />
                {value}
              </h2>
              <button onClick={() => deleteTask(index)} className="px-2 py-1 rounded-lg bg-blue-600 text-xl text-white">
                Delete Task
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Todoinput;
