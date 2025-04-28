 
```markdown
# Expense Dashboard

This is an **Expense Dashboard** application built using **Next.js** and **Tailwind CSS**, with features such as **Transition History**, **Add/Edit Transition**, **Credit and Debit Balance**, and visualizations like **Bar Charts** and **Pie Charts** using **Recharts**.

## Features

- **Transition History**: View a detailed history of all transactions (credit and debit).
- **Add/Edit Transition**: Add new transactions or edit existing ones.
- **Credit and Debit Balance**: View and manage your total credit and debit balance.
- **Bar Chart**: Visualize credit/debit transitions using a bar chart.
- **Pie Chart**: View the distribution of credit and debit using a pie chart.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered (SSR) applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Recharts**: A charting library built with React for rendering charts like bar and pie charts.
- **JavaScript (ES6+)**: Modern JavaScript for functionality and logic.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone  https://github.com/ankursasmal/Expance_Dashboard.git
   ```

 
   
3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

 
## How to Use

### Transition History

On the **dashboard page**, you will see a table displaying the transition history with details like **Date**, **Description**, **Debt**, and **Credit**. You can sort the history by date or credit amount.

### Add/Edit Transition

- To add a new transition, click on the **Add Transition** button.
- You will be redirected to the **Add Transition** page, where you can input the **date**, **description**, **debt**, and **credit**.
- To edit a transition, click on the **Edit** button next to any transition, and you will be able to update the transition details.

### Credit and Debit Balance

The dashboard will display the **total credit** and **total debit** balances, helping you track your finances.

### Bar Chart

You can visualize your credit/debit transactions with a **bar chart**. The chart displays the **credit** on the positive side and **debit** on the negative side.

### Pie Chart

The pie chart shows the distribution of **credit** and **debit** transactions as percentages, helping you understand your expenses and income distribution.

## Example

Once the server is running, you can navigate through the app as follows:

1. **Dashboard**: The main page displaying the transition history, credit/debit balance, bar chart, and pie chart.
2. **Add/Edit Transition**: Forms to add or edit transactions with date, description, debt, and credit.

## Development

To start the development server, run:

```bash
npm run dev
```

Then, open your browser and navigate to `http://localhost:3000` to view the dashboard.

 