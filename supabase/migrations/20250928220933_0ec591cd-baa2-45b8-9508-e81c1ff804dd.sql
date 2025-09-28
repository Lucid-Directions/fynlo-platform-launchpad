-- Fix RLS policy for loyalty_customer_data table to properly secure customer personal data
-- while allowing authorized restaurant staff access

-- Drop the existing policy
DROP POLICY IF EXISTS "Program owners can manage customer data" ON public.loyalty_customer_data;

-- Create new comprehensive RLS policy for loyalty_customer_data
CREATE POLICY "Restaurant staff can manage customer data"
ON public.loyalty_customer_data
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM loyalty_programs lp
    JOIN restaurants r ON r.id = lp.restaurant_id
    LEFT JOIN staff_members sm ON sm.restaurant_id = r.id
    WHERE lp.id = loyalty_customer_data.program_id
    AND (
      -- Restaurant owner has full access
      r.owner_id = auth.uid()
      OR 
      -- Staff member with loyalty management permission has access
      (sm.user_id = auth.uid() 
       AND sm.is_active = true 
       AND sm.can_manage_loyalty = true)
    )
  )
);