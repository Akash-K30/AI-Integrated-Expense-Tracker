import API from "./expenseService";

export const getMonthlyData = async(month)=>{

    const [year,monthNo]=month.split("-");

    const response=await API.get(

        `/api/expenses/monthly?month=${monthNo}&year=${year}`

    );

    return response.data;

};

export const getCategoryData = async (month) => {

    const [year, monthNo] = month.split("-");

    const response = await API.get(

        `/api/expenses/categories?month=${monthNo}&year=${year}`

    );

    return response.data;

};