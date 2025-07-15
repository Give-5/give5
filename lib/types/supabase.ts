export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      business_incentives: {
        Row: {
          business_id: string
          created_at: string
          description: string
          discount_type: string
          discount_value: string | null
          id: string
          is_active: boolean | null
          max_redemptions: number | null
          minimum_hours_required: number | null
          redemptions_count: number | null
          terms_conditions: string | null
          title: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          description: string
          discount_type: string
          discount_value?: string | null
          id?: string
          is_active?: boolean | null
          max_redemptions?: number | null
          minimum_hours_required?: number | null
          redemptions_count?: number | null
          terms_conditions?: string | null
          title: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string
          discount_type?: string
          discount_value?: string | null
          id?: string
          is_active?: boolean | null
          max_redemptions?: number | null
          minimum_hours_required?: number | null
          redemptions_count?: number | null
          terms_conditions?: string | null
          title?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_incentives_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_members: {
        Row: {
          business_id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          business_id: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          business_id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string
          category: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          category?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          category?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attended: boolean | null
          cancelled_at: string | null
          checked_in_at: string | null
          checked_out_at: string | null
          event_id: string
          hours_completed: number | null
          id: string
          notes: string | null
          registered_at: string
          volunteer_id: string
        }
        Insert: {
          attended?: boolean | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          event_id: string
          hours_completed?: number | null
          id?: string
          notes?: string | null
          registered_at?: string
          volunteer_id: string
        }
        Update: {
          attended?: boolean | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          event_id?: string
          hours_completed?: number | null
          id?: string
          notes?: string | null
          registered_at?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string
          end_time: string
          id: string
          image_url: string | null
          location_address: string
          location_coordinates: unknown | null
          location_name: string
          max_volunteers: number
          min_volunteers: number | null
          organization_id: string
          provided_items: string[] | null
          requirements: string[] | null
          start_time: string
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          end_time: string
          id?: string
          image_url?: string | null
          location_address: string
          location_coordinates?: unknown | null
          location_name: string
          max_volunteers?: number
          min_volunteers?: number | null
          organization_id: string
          provided_items?: string[] | null
          requirements?: string[] | null
          start_time: string
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          end_time?: string
          id?: string
          image_url?: string | null
          location_address?: string
          location_coordinates?: unknown | null
          location_name?: string
          max_volunteers?: number
          min_volunteers?: number | null
          organization_id?: string
          provided_items?: string[] | null
          requirements?: string[] | null
          start_time?: string
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      incentive_redemptions: {
        Row: {
          id: string
          incentive_id: string
          notes: string | null
          points_spent: number | null
          redeemed_at: string
          volunteer_id: string
        }
        Insert: {
          id?: string
          incentive_id: string
          notes?: string | null
          points_spent?: number | null
          redeemed_at?: string
          volunteer_id: string
        }
        Update: {
          id?: string
          incentive_id?: string
          notes?: string | null
          points_spent?: number | null
          redeemed_at?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "incentive_redemptions_incentive_id_fkey"
            columns: ["incentive_id"]
            isOneToOne: false
            referencedRelation: "business_incentives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incentive_redemptions_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incentive_redemptions_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      organization_members: {
        Row: {
          joined_at: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          joined_at?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          current_month_hours: number | null
          current_year_hours: number | null
          email: string
          full_name: string | null
          id: string
          last_hours_update: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          total_verified_hours: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_month_hours?: number | null
          current_year_hours?: number | null
          email: string
          full_name?: string | null
          id: string
          last_hours_update?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          total_verified_hours?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_month_hours?: number | null
          current_year_hours?: number | null
          email?: string
          full_name?: string | null
          id?: string
          last_hours_update?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          total_verified_hours?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          created_at: string
          current_points: number | null
          id: string
          last_calculated_at: string | null
          milestone_10_hours: boolean | null
          milestone_100_hours: boolean | null
          milestone_25_hours: boolean | null
          milestone_5_hours: boolean | null
          milestone_50_hours: boolean | null
          points_earned: number
          points_redeemed: number
          updated_at: string
          volunteer_id: string
        }
        Insert: {
          created_at?: string
          current_points?: number | null
          id?: string
          last_calculated_at?: string | null
          milestone_10_hours?: boolean | null
          milestone_100_hours?: boolean | null
          milestone_25_hours?: boolean | null
          milestone_5_hours?: boolean | null
          milestone_50_hours?: boolean | null
          points_earned?: number
          points_redeemed?: number
          updated_at?: string
          volunteer_id: string
        }
        Update: {
          created_at?: string
          current_points?: number | null
          id?: string
          last_calculated_at?: string | null
          milestone_10_hours?: boolean | null
          milestone_100_hours?: boolean | null
          milestone_25_hours?: boolean | null
          milestone_5_hours?: boolean | null
          milestone_50_hours?: boolean | null
          points_earned?: number
          points_redeemed?: number
          updated_at?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rewards_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: true
            referencedRelation: "volunteer_hour_stats"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
    }
    Views: {
      volunteer_hour_stats: {
        Row: {
          current_month_hours: number | null
          current_points: number | null
          current_year_hours: number | null
          email: string | null
          full_name: string | null
          last_hours_update: string | null
          milestone_10_hours: boolean | null
          milestone_100_hours: boolean | null
          milestone_25_hours: boolean | null
          milestone_5_hours: boolean | null
          milestone_50_hours: boolean | null
          points_earned: number | null
          points_redeemed: number | null
          total_events_attended: number | null
          total_verified_hours: number | null
          volunteer_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      auto_checkout_volunteers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_event_hours: {
        Args: { checked_in: string; checked_out: string }
        Returns: number
      }
      recalculate_all_user_hours: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      event_status: "draft" | "active" | "cancelled" | "completed"
      user_role: "volunteer" | "organization" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_status: ["draft", "active", "cancelled", "completed"],
      user_role: ["volunteer", "organization", "admin"],
    },
  },
} as const