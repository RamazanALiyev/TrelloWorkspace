import React, { useState, useEffect } from "react";
import { Maincontext } from "./context";
import { Toaster } from 'react-hot-toast';
import { Home } from "./pages";
import { Header, Title, Loader } from './Components';
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = { loading, setLoading, showCardModal, setShowCardModal, persons, setPersons, showModal, setShowModal, tasks, setTasks, showMembersModal, setShowMembersModal };
  useEffect(() => {
    setLoading(true);
    axios.get("https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/tasks")
      .then(function (res) {
        setLoading(false);
        setPersons(res.data);
      });
    axios.get("https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/users")
      .then(function (res) {
        const transformedTasks = res.data.reduce((acc, task) => {
          const { status, ...rest } = task;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(rest);
          return acc;
        }, {});
        setLoading(false);
        setTasks(transformedTasks);
      });
  }, [])
  return (
    <Maincontext.Provider value={data}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Header />
      <Title />
      <Home />
      {loading && <Loader />}
    </Maincontext.Provider>
  );
}
export default App;