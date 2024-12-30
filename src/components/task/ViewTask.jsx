import React from 'react'
import {
    FcHighPriority
  } from "react-icons/fc";
  import {
    GiSandsOfTime
  } from "react-icons/gi";
  import {
    MdOutlineTimer
  } from "react-icons/md";
  import {
    SiStatuspage
  } from "react-icons/si";

  import {
    IoIosArrowForward
  } from "react-icons/io";

const ViewTask = () => {
  return (
    <div className="font-medium">
    {/* <div className="flex justify-between items-center">
      <p>Task ID: {task?.taskIdentifier}</p>
      <Link to={`/projects/${task?.projectIdentifier}`}>
        <button className="text-sm font-mono text-green-500 flex items-center">
          Go to project <IoIosArrowForward size={16} className="ml-1" />
        </button>
      </Link>
    </div> */}

    <div className="space-y-2 mt-3">
      <h2 className="text-lg font-semibold text-teal-500">{task?.title}</h2>
      <p className="text-sm text-gray-400">{task?.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GiSandsOfTime size={15} />
          <p>Remaining days:</p>
        </div>
        <p>{remaining} days</p>
      </div>

      <div className="flex justify-between items-center text-green-500">
        <div className="flex items-center gap-2">
          <MdOutlineTimer size={15} />
          <p>Assign Date:</p>
        </div>
        <p>{moment(task?.startDate).format("MMMM Do YYYY")}</p>
      </div>

      <div className="flex justify-between items-center text-red-500">
        <div className="flex items-center gap-2">
          <MdOutlineTimer size={15} />
          <p>Due Date:</p>
        </div>
        <p>{moment(task?.endDate).format("MMMM Do YYYY")}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FcHighPriority size={15} />
          <p>Task Priority:</p>
        </div>
        <p>{task?.priority.toUpperCase()}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SiStatuspage size={15} />
          <p>Task Status:</p>
        </div>
        <p>{task?.status.toUpperCase()}</p>
      </div>
    </div>

    <hr className="my-4" />

    <p>Assigned By</p>

    {leaderLoading ? (
      <div className="text-center my-4">
        <div className="loader border-t-2 border-red-500"></div>
      </div>
    ) : (
      <div className="flex items-center gap-2 mt-2">
        <img
          src={`https://ui-avatars.com/api/?name=${leader?.firstName}`}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="flex items-center gap-1">

            <p>
              {`${leader?.firstName} ${leader?.lastName}`} (@{leader?.username})
            </p>
          </div>
          <p className="text-sm text-gray-500">{leader?.email}</p>
        </div>
      </div>
    )}

    <hr className="my-4" />

    {developer && (
      <>
        {task?.status === Status.TODO && (
          <button
            className="w-full py-2 font-mono bg-blue-500 text-white rounded mt-2"
            disabled={isLoading}
            onClick={() => handleStatus(Status.PROGRESS)}
          >
            Progress
          </button>
        )}
        {task?.status === Status.PROGRESS && (
          <div className="flex gap-2 mt-2">
            <button
              className="w-full py-2 font-mono bg-yellow-500 text-white rounded"
              disabled={isLoading}
              onClick={() => handleStatus(Status.TODO)}
            >
              Todo
            </button>
            <button
              className="w-full py-2 font-mono bg-green-500 text-white rounded"
              disabled={isLoading}
              onClick={() => handleStatus(Status.COMPLETED)}
            >
              Complete
            </button>
          </div>
        )}
        {task?.status === Status.COMPLETED && (
          <button
            className="w-full py-2 font-mono bg-blue-500 text-white rounded mt-2"
            disabled={isLoading}
            onClick={() => handleStatus(Status.PROGRESS)}
          >
            Progress
          </button>
        )}
      </>
    )}
  </div>
  )
}

export default ViewTask
