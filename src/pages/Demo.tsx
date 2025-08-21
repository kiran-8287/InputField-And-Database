import React, { useState } from 'react';
import InputField from '../components/InputField';
import DataTable from '../components/DataTable';
import ThemeToggle from '../components/ThemeToggle';

// Sample data for the demo
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const demoUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16',
  },
];

const userColumns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof User,
    sortable: true,
    render: (value: string) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin' as keyof User,
    sortable: true,
  },
];

const Demo: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, you would send this data to an API
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Component Demo
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Showcasing InputField and DataTable components
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
              <ThemeToggle size="lg" />
              <button className="btn btn-primary w-full sm:w-auto">
                View Storybook
              </button>
              <button className="btn btn-secondary w-full sm:w-auto">
                Run Tests
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* InputField Demo Section */}
          <div className="space-y-6">
            <div className="card">
              <div className="card-header">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  InputField Component
                </h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <InputField
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    helperText="This will be displayed on your profile"
                    required
                  />
                  
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    helperText="We'll never share your email with anyone else"
                    required
                  />
                  
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    showPasswordToggle
                    required
                  />
                  
                  <InputField
                    label="Role"
                    placeholder="Enter your role"
                    value={formData.role}
                    onChange={handleInputChange('role')}
                    clearable
                  />
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      Submit Form
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* InputField Variants */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  Input Variants
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <InputField
                    label="Filled Variant"
                    placeholder="Filled input field"
                    variant="filled"
                  />
                  <InputField
                    label="Ghost Variant"
                    placeholder="Ghost input field"
                    variant="ghost"
                  />
                  <InputField
                    label="Small Size"
                    placeholder="Small input"
                    size="sm"
                  />
                  <InputField
                    label="Large Size"
                    placeholder="Large input"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* InputField States */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  Input States
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <InputField
                    label="Disabled Input"
                    placeholder="This input is disabled"
                    disabled
                    value="Disabled value"
                  />
                  <InputField
                    label="Error Input"
                    placeholder="This input has an error"
                    errorMessage="This field is required"
                    invalid
                  />
                  <InputField
                    label="Clearable Input"
                    placeholder="Type something to clear"
                    clearable
                    value="Initial value"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DataTable Demo Section */}
          <div className="space-y-6">
            <div className="card">
              <div className="card-header">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  DataTable Component
                </h2>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300 mb-2">
                    User Management
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    This table demonstrates sorting, row selection, and custom cell rendering.
                  </p>
                </div>

                <DataTable
                  data={demoUsers}
                  columns={userColumns}
                  selectable={true}
                  onRowSelect={setSelectedUsers}
                  className="shadow-sm"
                />

                {selectedUsers.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2 transition-colors duration-300">
                      Selected Users ({selectedUsers.length})
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 transition-colors duration-300">
                      {selectedUsers.map((user) => (
                        <li key={user.id}>
                          • {user.name} ({user.email}) - {user.role}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Table Features Demo */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  Table Features
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Sorting
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Click on column headers to sort data. Click again to reverse the sort order.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Row Selection
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Use checkboxes to select individual rows or select all rows at once.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Custom Rendering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Status column shows colored badges, demonstrating custom cell rendering.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table States Demo */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  Table States
                </h3>
              </div>
              <div className="card-body space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Loading State
                  </h4>
                  <DataTable
                    data={[]}
                    columns={userColumns}
                    loading={true}
                    loadingText="Loading users..."
                    className="shadow-sm"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Empty State
                  </h4>
                  <DataTable
                    data={[]}
                    columns={userColumns}
                    emptyText="No users found"
                    className="shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Component Information */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  Component Information
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  <div>
                    <strong>InputField:</strong> A versatile input component with validation, theming, and accessibility features.
                  </div>
                  <div>
                    <strong>DataTable:</strong> A generic, typed data table with sorting, selection, and loading states.
                  </div>
                  <div>
                    <strong>ThemeToggle:</strong> Beautiful animated theme switcher with light/dark/system support.
                  </div>
                  <div>
                    <strong>Features:</strong> All components support light/dark themes, responsive design, and ARIA accessibility.
                  </div>
                  <div>
                    <strong>Testing:</strong> Comprehensive test coverage with Jest and React Testing Library.
                  </div>
                  <div>
                    <strong>Documentation:</strong> Interactive stories available in Storybook.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
