import { supabase } from './supabase'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string
}

/**
 * Create or update user profile in Supabase
 */
export const createOrUpdateUserProfile = async (userProfile: UserProfile): Promise<boolean> => {
  try {
    console.log('Creating/updating user profile:', {
      id: userProfile.id,
      email: userProfile.email,
      full_name: userProfile.full_name,
      has_avatar: !!userProfile.avatar_url
    })

    // Validate required fields
    if (!userProfile.id || !userProfile.email) {
      console.error('Missing required fields: id or email')
      return false
    }

    // First, check if the profile already exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userProfile.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is fine for new users
      console.error('Error checking existing profile:', fetchError)
      return false
    }

    const profileData = {
      id: userProfile.id,
      email: userProfile.email,
      full_name: userProfile.full_name,
      avatar_url: userProfile.avatar_url,
      updated_at: new Date().toISOString(),
    }

    if (existingProfile) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', userProfile.id)

      if (updateError) {
        console.error('Error updating user profile:', updateError)
        return false
      }

      console.log('User profile updated successfully')
    } else {
      // Create new profile
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          ...profileData,
          created_at: new Date().toISOString(),
        })

      if (insertError) {
        console.error('Error creating user profile:', insertError)
        console.error('Insert error details:', JSON.stringify(insertError, null, 2))
        return false
      }

      console.log('User profile created successfully')
    }

    return true
  } catch (error) {
    console.error('Unexpected error in createOrUpdateUserProfile:', error)
    return false
  }
}

/**
 * Get user profile from Supabase
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        return null
      }
      console.error('Error fetching user profile:', error)
      return null
    }

    return {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
    }
  } catch (error) {
    console.error('Unexpected error in getUserProfile:', error)
    return null
  }
}

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<UserProfile, 'id'>>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user profile:', error)
      return false
    }

    console.log('User profile updated successfully')
    return true
  } catch (error) {
    console.error('Unexpected error in updateUserProfile:', error)
    return false
  }
}

/**
 * Delete user profile
 */
export const deleteUserProfile = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId)

    if (error) {
      console.error('Error deleting user profile:', error)
      return false
    }

    console.log('User profile deleted successfully')
    return true
  } catch (error) {
    console.error('Unexpected error in deleteUserProfile:', error)
    return false
  }
}
