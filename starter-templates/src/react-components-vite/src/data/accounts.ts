export type Account = {
  id: string;
  company: string;
  owner: string;
  status: 'Active' | 'Churn Risk' | 'Prospect';
  mrr: number;
  createdAt: string;
  health: number;
};

export const sampleData: Account[] = [
  { id: 'A-1001', company: 'Contoso Ltd', owner: 'Deborah', status: 'Active', mrr: 12400, createdAt: '2024-01-18', health: 86 },
  { id: 'A-1002', company: 'Fabrikam', owner: 'Lee', status: 'Prospect', mrr: 0, createdAt: '2024-03-03', health: 48 },
  { id: 'A-1003', company: 'Northwind Traders', owner: 'Jamal', status: 'Active', mrr: 8200, createdAt: '2023-11-09', health: 92 },
  { id: 'A-1004', company: 'Adventure Works', owner: 'Priya', status: 'Churn Risk', mrr: 6100, createdAt: '2023-12-22', health: 34 },
  { id: 'A-1005', company: 'Litware', owner: 'Nora', status: 'Active', mrr: 13900, createdAt: '2024-04-11', health: 75 },
  { id: 'A-1006', company: 'Tailspin Toys', owner: 'Alex', status: 'Prospect', mrr: 0, createdAt: '2024-05-30', health: 57 },
  { id: 'A-1007', company: 'Wingtip', owner: 'Diego', status: 'Active', mrr: 9800, createdAt: '2023-10-04', health: 81 },
  { id: 'A-1008', company: 'Blue Yonder', owner: 'Mina', status: 'Churn Risk', mrr: 5400, createdAt: '2023-09-16', health: 29 },
  { id: 'A-1009', company: 'Wide World Importers', owner: 'Chris', status: 'Active', mrr: 15300, createdAt: '2024-02-07', health: 64 },
  { id: 'A-1010', company: 'Graphic Design Institute', owner: 'Ivy', status: 'Prospect', mrr: 0, createdAt: '2024-06-10', health: 53 },
];
