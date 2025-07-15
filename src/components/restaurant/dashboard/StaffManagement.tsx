import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Users, 
  UserCheck, 
  UserX,
  Crown,
  Shield,
  ChefHat,
  User,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Clock,
  CalendarDays
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
}

interface StaffMember {
  id: string;
  user_id: string;
  role: string;
  permissions: any;
  hourly_rate?: number;
  is_active: boolean;
  created_at: string;
  restaurant_id: string;
  updated_at: string;
}

interface StaffSchedule {
  id: string;
  staff_member_id: string;
  restaurant_id: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  role_assigned?: string;
  notes?: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

interface StaffManagementProps {
  restaurant: Restaurant;
}

export const StaffManagement: React.FC<StaffManagementProps> = ({ restaurant }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [schedules, setSchedules] = useState<StaffSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('staff');
  const { toast } = useToast();

  useEffect(() => {
    fetchStaffMembers();
    fetchSchedules();
  }, [restaurant.id]);

  const fetchStaffMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('staff_members')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setStaffMembers(data || []);
    } catch (error) {
      console.error('Error fetching staff members:', error);
      toast({
        title: "Error",
        description: "Failed to load staff members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('staff_schedules')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .gte('shift_date', new Date().toISOString().split('T')[0])
        .order('shift_date', { ascending: true });

      if (error) {
        throw error;
      }

      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast({
        title: "Error",
        description: "Failed to load schedules",
        variant: "destructive",
      });
    }
  };

  const toggleStaffStatus = async (staffId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .update({ is_active: !currentStatus })
        .eq('id', staffId);

      if (error) {
        throw error;
      }

      await fetchStaffMembers();
      toast({
        title: "Success",
        description: `Staff member ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error updating staff status:', error);
      toast({
        title: "Error",
        description: "Failed to update staff status",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4" />;
      case 'manager': return <Shield className="w-4 h-4" />;
      case 'chef': return <ChefHat className="w-4 h-4" />;
      case 'staff': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'chef': return 'bg-orange-100 text-orange-800';
      case 'staff': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const activeStaff = staffMembers.filter(staff => staff.is_active);
  const roleStats = {
    owners: staffMembers.filter(staff => staff.role === 'owner').length,
    managers: staffMembers.filter(staff => staff.role === 'manager').length,
    chefs: staffMembers.filter(staff => staff.role === 'chef').length,
    staff: staffMembers.filter(staff => staff.role === 'staff').length,
  };

  const todaySchedules = schedules.filter(schedule => 
    schedule.shift_date === new Date().toISOString().split('T')[0]
  );

  const upcomingSchedules = schedules.filter(schedule => 
    schedule.shift_date > new Date().toISOString().split('T')[0]
  ).slice(0, 5);

  if (loading) {
    return <div className="p-6">Loading staff...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage restaurant staff, schedules, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Add Schedule
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold">{staffMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Staff</p>
                <p className="text-2xl font-bold text-green-600">{activeStaff.length}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Shifts</p>
                <p className="text-2xl font-bold text-blue-600">{todaySchedules.length}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Managers</p>
                <p className="text-2xl font-bold text-purple-600">{roleStats.managers}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kitchen Staff</p>
                <p className="text-2xl font-bold text-orange-600">{roleStats.chefs}</p>
              </div>
              <ChefHat className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staff">Staff Members</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search staff by name or user ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Roles</option>
                  <option value="owner">Owners</option>
                  <option value="manager">Managers</option>
                  <option value="chef">Chefs</option>
                  <option value="staff">General Staff</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Staff List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className={`${!staff.is_active ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {getRoleIcon(staff.role)}
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Staff Member
                        </h3>
                        <Badge className={getRoleColor(staff.role)}>
                          {staff.role}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(staff.is_active)}>
                      {staff.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>User ID: {staff.user_id.slice(0, 8)}...</p>
                      {staff.hourly_rate && (
                        <p>Hourly Rate: £{staff.hourly_rate.toFixed(2)}</p>
                      )}
                      <p>
                        Joined: {new Date(staff.created_at).toLocaleDateString('en-GB')}
                      </p>
                    </div>

                    {staff.permissions && staff.permissions.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {staff.permissions.slice(0, 3).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {staff.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{staff.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-2 border-t">
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStaffStatus(staff.id, staff.is_active)}
                        >
                          {staff.is_active ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No staff members found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaySchedules.length > 0 ? (
                <div className="space-y-3">
                  {todaySchedules.map((schedule) => {
                    const staffMember = staffMembers.find(s => s.id === schedule.staff_member_id);
                    return (
                      <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {getRoleIcon(staffMember?.role || 'staff')}
                          </div>
                          <div>
                            <p className="font-medium">Staff Member</p>
                            <p className="text-sm text-gray-600">
                              {schedule.start_time} - {schedule.end_time}
                            </p>
                          </div>
                        </div>
                        <Badge className={schedule.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {schedule.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No shifts scheduled for today</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingSchedules.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSchedules.map((schedule) => {
                    const staffMember = staffMembers.find(s => s.id === schedule.staff_member_id);
                    return (
                      <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {getRoleIcon(staffMember?.role || 'staff')}
                          </div>
                          <div>
                            <p className="font-medium">Staff Member</p>
                            <p className="text-sm text-gray-600">
                              {new Date(schedule.shift_date).toLocaleDateString('en-GB')} • {schedule.start_time} - {schedule.end_time}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {schedule.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming shifts scheduled</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};