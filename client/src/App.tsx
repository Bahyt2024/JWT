import './index.css';  // Убедитесь, что путь правильный

import LoginForm from "./components/LoginForm.tsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "./main.tsx";
import {observer} from 'mobx-react-lite'
import {IUser} from "./models/IUser.ts";
import UService from "./services/UserService.ts";


function App() {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            console.log("Calling checkAuth...");
            store.checkAuth();
        }
    }, []);

    async function getUsers(){
        try {
            const response = await UService.fetchUsers()
            setUsers(response.data);
        }catch (e){
            console.log(e)
        }
    }


    if(store.isLoading){
        return (
            <div>Loading...</div>
        )
    }

    if(!store.isAuth){
         return (
             <LoginForm />
         )
    }

  return (
      <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {store.isAuth ? `Пользователь авторизован: ${store.user.email}` : 'Авторизуйтесь'}
              </h1>
              <h2 className="text-lg text-gray-600 mb-4">
                  {store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт'}
              </h2>
              <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => store.logout()}>
                  Logout
              </button>

              <div className="mt-4">
                  <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      onClick={getUsers}>
                      Get Users
                  </button>
              </div>

              <div className="mt-4 space-y-2">
                  {users.map(user => (
                      <div key={user.email} className="text-gray-800">{user.email}</div>
                  ))}
              </div>
          </div>
      </div>
  )
}

export default observer(App)
