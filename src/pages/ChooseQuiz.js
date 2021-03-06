import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { examsServices } from "../services/examsServices";

export default function ChooseQuiz() {
  const [exams, setExams] = useState([]);
  const [show, setShow] = useState(true);
  const [showToast, setShowToast] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to access this page");
      navigate("/");
    }
    setShowToast(true);
    let time = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => {
      clearTimeout(time);
      setShow(false);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const reps = await examsServices.getExams();
        setExams(reps.data);
        console.log(reps);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <>
      {showToast ? (
        <div className="flex absolute left-0 right-0 top-10  ease-in duration-300 flex-col justify-center">
          <div
            className="bg-green-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3"
            id="static-example"
            aria-live="assertive"
            aria-atomic="true"
            data-mdb-autohide="false"
          >
            <div className="bg-green-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-500 rounded-t-lg">
              <p className="font-bold text-white flex items-center">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="info-circle"
                  className="w-4 h-4 mr-2 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                  ></path>
                </svg>
                SUCCESS
              </p>
            </div>
            <div class="p-3 bg-green-600 rounded-b-lg break-words text-white">
              <p class="font-bold">Login in success</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {show ? (
        <div className="h-screen w-full flex items-center justify-center">
          <svg
            role="status"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div
          id="app"
          className="flex w-full h-screen justify-center items-center"
        >
          <div className="w-full max-w-xl p-3">
            <h1 className="font-bold text-5xl text-center text-indigo-700">
              Hackathon Quiz
            </h1>
            <div className="mt-6 flex flex-col justify-center items-center">
              {exams?.map((exam, index) => (
                <div key={index} className="w-full my-2">
                  <Link to={`/quiz?id=${exam?.id}`}>
                    <button className="float-right w-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2">
                      {exam?.exam_name}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
