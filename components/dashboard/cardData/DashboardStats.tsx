import { dashboardData } from '@/constants/dashboardData'
import React from 'react'
import { Card, CardContent } from '../../ui/card';
import { 
  Users, 
  UserPlus, 
  Briefcase, 
  Calendar, 
  Ticket, 
  UserCog,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const DashboardStats = () => {
  const content = dashboardData;
  
  // Helper function to get icon based on stat type
  const getIcon = (type: string) => {
    switch(type) {
      case 'totalCustomers': return <Users className="h-5 w-5 text-blue-500" />;
      case 'activeLeads': return <UserPlus className="h-5 w-5 text-green-500" />;
      case 'dealsInProgress': return <Briefcase className="h-5 w-5 text-purple-500" />;
      case 'tasksDueToday': return <Calendar className="h-5 w-5 text-amber-500" />;
      case 'openTickets': return <Ticket className="h-5 w-5 text-red-500" />;
      case 'teamMembers': return <UserCog className="h-5 w-5 text-indigo-500" />;
      default: return null;
    }
  };

  // Helper function to get percentage change (mock data)
  const getPercentageChange = (type: string) => {
    const changes = {
      totalCustomers: 12,
      activeLeads: -5,
      dealsInProgress: 8,
      tasksDueToday: 15,
      openTickets: -3,
      teamMembers: 0
    };
    return changes[type as keyof typeof changes];
  };

  // Stats data array for easier mapping
  const statsData = [
    { 
      key: 'totalCustomers', 
      label: 'Total Customers', 
      value: content.stats.totalCustomers 
    },
    { 
      key: 'activeLeads', 
      label: 'Active Leads', 
      value: content.stats.activeLeads 
    },
    { 
      key: 'dealsInProgress', 
      label: 'Deals In Progress', 
      value: content.stats.dealsInProgress 
    },
    { 
      key: 'tasksDueToday', 
      label: 'Tasks Due Today', 
      value: content.stats.tasksDueToday 
    },
    { 
      key: 'openTickets', 
      label: 'Open Tickets', 
      value: content.stats.openTickets 
    },
    { 
      key: 'teamMembers', 
      label: 'Team Members', 
      value: content.stats.teamMembers 
    }
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-5'>
      {statsData.map((stat) => {
        const percentageChange = getPercentageChange(stat.key);
        const isPositive = percentageChange > 0;
        const isNeutral = percentageChange === 0;
        
        return (
            <Card
            key={stat.key}
            className="overflow-hidden rounded-lg border-none transition-transform hover:scale-[1.02]"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  {getIcon(stat.key)}
                </div>
          
                {!isNeutral && (
                  <div
                    className={`flex items-center text-sm font-semibold ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(percentageChange)}%
                  </div>
                )}
              </div>
          
              <div className="mt-6 space-y-1">
                <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
          
        );
      })}
    </div>
  );
};

export default DashboardStats;