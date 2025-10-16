# 💰 Student Finance Tracker

**Created by:** Milliam Mukamukiza  
**Live Demo:** [https://mmukamukiza21.github.io/student-finance-tracker](https://mmukamukiza21.github.io/student-finance-tracker)  
**GitHub Repository:** [https://github.com/mmukamukiza21/student-finance-tracker](https://github.com/mmukamukiza21/student-finance-tracker)  
**🎥 Demo Video:** [Watch on YouTube](https://youtu.be/6waXknOvAPI)

---

## 🌟 Project Theme
**Theme:** Student Finance Management  
This project helps students easily manage and track their financial activities such as daily expenses, income, and savings — promoting smart budgeting and financial awareness.

---

## 🧩 Features
- Add new financial records (description, category, amount, date)
- View all transactions in a dynamic table
- Automatically calculate total records and total amount
- Clear dashboard view
- Keyboard navigation support
- Responsive and accessible design
- Data validation using Regular Expressions (Regex)

---

## 🔍 Regex Catalog

| Purpose | Regex Pattern | Example |
|----------|----------------|---------|
| Validate Date | `/^\d{4}-\d{2}-\d{2}$/` | `2025-10-16` |
| Validate Amount | `/^\d+(\.\d{1,2})?$/` | `45.50` |
| Match Valid Category Words | `/^(Food|Transport|School|Rent|Health|Misc)$/i` | `food` |
| Validate Description | `/^[A-Za-z0-9\s@#&.,-]+$/` | `Snacks @Canteen` |

---

## ⌨️ Keyboard Map

| Key | Action |
|-----|--------|
| **Enter** | Add a new record |
| **Tab / Shift+Tab** | Move between form inputs |
| **↑ / ↓** | Navigate between table rows |
| **Delete** | Remove a selected record (if implemented) |

---

## ♿ Accessibility (A11y) Notes
This project is built with accessibility in mind:
- Semantic HTML (`<form>`, `<table>`, `<label>`)
- Supports full keyboard navigation
- Good color contrast and readable text
- Descriptive form labels for screen readers

---

## 🧪 How to Run Tests
1. Clone or download the repository  
2. Open `index.html` in your browser  
3. Add new records using the form fields  
4. Verify that:
   - Total records and amount update automatically  
   - Keyboard navigation works (no mouse required)  
   - Invalid inputs are handled correctly via regex validation  

---

## 🌱 seed.json (Sample Data)
This project includes a `seed.json` file with 10+ diverse records for testing.

Example:
```json
[
  {"description": "Bus Ticket", "amount": 500, "category": "Transport", "date": "2025-10-10"},
  {"description": "Lunch @ Canteen", "amount": 1200, "category": "Food", "date": "2025-09-20"},
  {"description": "Stationery", "amount": 800, "category": "School", "date": "2025-08-15"},
  {"description": "Water Bottle", "amount": 600, "category": "Health", "date": "2025-09-02"},
  {"description": "Monthly Rent", "amount": 25000, "category": "Rent", "date": "2025-10-01"},
  {"description": "Transport Home", "amount": 1000, "category": "Transport", "date": "2025-09-25"},
  {"description": "Weekend Movie", "amount": 3000, "category": "Misc", "date": "2025-08-22"},
  {"description": "Phone Credit", "amount": 1500, "category": "Misc", "date": "2025-10-12"},
  {"description": "Exam Fees", "amount": 5000, "category": "School", "date": "2025-07-30"},
  {"description": "Groceries", "amount": 4200, "category": "Food", "date": "2025-09-10"}
]
