'use client'
import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/components/Auth'
import { useContext } from 'react'
import EditExpense from '../EidtExpenses'
const ExList = () => {
  const [expenses, setExpenses] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedData,setSelectedData]=useState(null)
  const { email } = useContext(AuthContext)
  let _email = email.replace("@", '').replace(".", '')
  async function getExpenses() {
    try {
      const res = await fetch(`https://nextjs-api-testing-default-rtdb.firebaseio.com/${_email}.json`)
      if (res.ok) {
        const data = await res.json()
        let arrayOfObjects = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setExpenses(arrayOfObjects)
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }
  async function deleteExpense(expense) {
    try {
      const res = await fetch(`https://nextjs-api-testing-default-rtdb.firebaseio.com/${_email}/${expense.id}.json`, {
        method: "DELETE"
      });
  
      if (res.ok) {
        console.log('Expense deleted successfully');
        setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== expense.id));
      } else {
        console.error('Failed to delete expense:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  }
  
  useEffect(() => {
    getExpenses()
  }, [])
  
  useEffect(() => {
    let price = 0
    expenses.forEach((expense) => price += Number(expense.amount))
    setTotalPrice(price)
  }, [expenses])
  return (
    <>
    <EditExpense setSelectedData={setSelectedData} selectedData={selectedData} setExpenses={setExpenses}/>
    <div className='flex justify-center items-center min-h-screen mt-12'>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox hidden" />
                </label>
              </th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenses) && expenses.length > 0 &&
              expenses.map((expens) => (
                <tr key={expens.title}>
                  <th className='!max-w-7 min-w-5'>
                    <label>
                      <input type="checkbox" className="checkbox hidden" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{expens.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {expens.amount}
                  </td>
                  <td> {expens.description}</td>
                  <td>
                    <div className="join">
                      <button className="btn join-item active:bg-primary active:text-black hover:bg-base-content hover:text-black " onClick={()=>{
                        setSelectedData(expens)
                        document.getElementById('my_modal_5').showModal()
                        }}>EDIT</button>
                      <button className="btn join-item active:bg-orange-600 active:text-black hover:bg-orange-600 hover:text-black" onClick={()=>deleteExpense(expens)}>DELETE</button>
                    </div>
                  </td>

                </tr>
              ))
            }
            <tr>
              <th></th>
              <th>Total Price</th>
              <th>{totalPrice}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default ExList