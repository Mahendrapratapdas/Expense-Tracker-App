import { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }
    //add logic for updating the expense here
    case "UPDATE":{
      // const data = state.expenses.filter((expense) => expense.id !== payload.expense.id)
      // data.unshift(payload.expense)
      // return{
      //   expenses: data
      // }
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === payload.expense.id) {
          return payload.expense; // Replace with updated expense object
        } else {
          return expense; // Keep the expense as it is
        }
      });
    
      return {
        ...state,
        expenses: updatedExpenses,
      };
    
    }

    default:
      return state;
  }
};
// Use proper state management for populating the form in the expenseForm component on clicking the edit icon in the Transaction component
function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [editExpense, setEditExpense] = useState(null)
  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };
  // Add dispatch function for updation
  const updateNewExpense = (expense) =>{
    dispatch({ type: "UPDATE", payload: { expense } });
    // console.log("Expenses---------",state.expenses)
    setEditExpense(null)
  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm 
        addExpense={addExpense} 
        // Pass the props for populating the form with expense text and amount
        updateNewExpense={updateNewExpense}
        editExpense = {editExpense}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            // Pass props to update a transacation
            updateExpense={setEditExpense}
          />
        </div>
      </div>
    </>
  );
}

export default App;
