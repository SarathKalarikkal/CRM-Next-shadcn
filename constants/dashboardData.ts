        export const dashboardData = {
    "stats": {
      "totalCustomers": 120,
      "activeLeads": 45,
      "dealsInProgress": 18,
      "tasksDueToday": 7,
      "openTickets": 5,
      "teamMembers": 8
    },
    "leadChart": {
      "labels": ["Hot", "Warm", "Cold"],
      "data": [20, 15, 10]
    },
    "dealPipeline": [
      { "stage": "New", "count": 10 },
      { "stage": "Contacted", "count": 8 },
      { "stage": "Proposal", "count": 5 },
      { "stage": "Won", "count": 3 },
      { "stage": "Lost", "count": 2 }
    ],
    "monthlyProgress": [
      { "month": "Jan", "leads": 10, "deals": 2 },
      { "month": "Feb", "leads": 15, "deals": 5 },
      { "month": "Mar", "leads": 20, "deals": 10 }
    ],
    "recentActivity": [
      {
        type: "New Customer",       
        user: "Ravi",
        time: "5 minutes ago",
        status: "success",
      },
      {
        type: "Ticket Closed",
       
        user: "Anjali",
        time: "1 hour ago",
        status: "info",
      },
      {
        type: "Lead Updated",
        user: "Karan",
        time: "2 hours ago",
        status: "warning",
      },
    ]
  }
