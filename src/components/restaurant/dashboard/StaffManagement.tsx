import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Mail, 
  Settings, 
  Trash2,
  UserCheck,
  UserX,
  Search,
  Filter,
  Crown,
  ChefHat,
  User,
  Calendar,
  Clock,
  Plus,
  Edit,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  day_of_week: number;
  start_time: string;
  end_time: string;
  break_start?: string;
  break_end?: string;
  is_recurring: boolean;
  specific_date?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  staff_members?: {
    id: string;
    profiles?: {
      full_name?: string;
    };
  };
}

interface StaffManagementProps {
  restaurant: Restaurant;
}

export const StaffManagement: React.FC<StaffManagementProps> = ({ restaurant }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [schedules, setSchedules] = useState<StaffSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
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

      if (error) throw error;
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
        .select(`
          *,
          staff_members (
            id,
            profiles (
              full_name
            )
          )
        `)
        .eq('restaurant_id', restaurant.id)
        .eq('is_active', true)
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      setSchedules((data || []) as StaffSchedule[]);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast({
        title: "Error",
        description: "Failed to load staff schedules",
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

      if (error) throw error;

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
    managers: staffMembers.filter(staff => staff.role === 'manager').length,
    chefs: staffMembers.filter(staff => staff.role === 'chef').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff data...</p>
        </div>
      </div>
    );
  }

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getSchedulesByDay = (day: number) => {
    return schedules.filter(schedule => schedule.day_of_week === day);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600">Manage your restaurant staff and schedules</p>
          </div>
        </div>
        <Button className="flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staff" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Staff Members</span>
          </TabsTrigger>
          <TabsTrigger value="schedules" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Schedules</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Staff</p>
                    <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Staff</p>
                    <p className="text-2xl font-bold text-gray-900">{activeStaff.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Managers</p>
                    <p className="text-2xl font-bold text-gray-900">{roleStats.managers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <ChefHat className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Kitchen Staff</p>
                    <p className="text-2xl font-bold text-gray-900">{roleStats.chefs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="owner">Owners</SelectItem>
                    <SelectItem value="manager">Managers</SelectItem>
                    <SelectItem value="chef">Chefs</SelectItem>
                    <SelectItem value="staff">General Staff</SelectItem>
                  </SelectContent>
                </Select>
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
                        <h3 className="font-semibold">Staff Member</h3>
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
                      <p>Joined: {new Date(staff.created_at).toLocaleDateString('en-GB')}</p>
                    </div>

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

        <TabsContent value="schedules" className="space-y-6">
          {/* Schedule Management Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
                <p className="text-gray-600">Manage staff work schedules</p>
              </div>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Schedule</span>
            </Button>
          </div>

          {/* Weekly Calendar View */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <div key={day} className="space-y-3">
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900">{getDayName(day)}</h3>
                      <div className="w-full h-px bg-gray-200 mt-2"></div>
                    </div>
                    
                    <div className="space-y-2 min-h-[200px]">
                      {getSchedulesByDay(day).map((schedule) => (
                        <div
                          key={schedule.id}
                          className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm"
                        >
                          <div className="font-medium text-gray-900 mb-1">
                            {schedule.staff_members?.profiles?.full_name || 'Unknown Staff'}
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                            </span>
                          </div>
                          {schedule.break_start && schedule.break_end && (
                            <div className="text-xs text-gray-500 mt-1">
                              Break: {formatTime(schedule.break_start)} - {formatTime(schedule.break_end)}
                            </div>
                          )}
                          {schedule.notes && (
                            <div className="text-xs text-gray-600 mt-1">
                              {schedule.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Schedules</p>
                    <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hours This Week</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {schedules.reduce((total, schedule) => {
                        const start = new Date(`2000-01-01T${schedule.start_time}`);
                        const end = new Date(`2000-01-01T${schedule.end_time}`);
                        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                        return total + hours;
                      }, 0).toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Scheduled Staff</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(schedules.map(s => s.staff_member_id)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};