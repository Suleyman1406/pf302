import { Button } from '@/components/ui/button';
import { selectUser } from '@/store/auth/authSlice';
import { UserCircle2Icon } from 'lucide-react';
import { User2Icon } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import EditProfileDialog from './components/EditProfileDialog';

const ProfilePage = () => {
  const { user } = useSelector(selectUser);

  return (
    <div className='mx-auto max-w-screen-lg px-4 md:px-10 py-10'>
      <h1 className='text-3xl font-semibold text-center'>Profile Page</h1>

      <div className=''>
        <div className='flex gap-4 mt-8'>
          <div className='w-1/3'>
            {
              user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt='avatar'
                  className='w-12 h-12 rounded-full object-cover'
                />
              ) : (
                <UserCircle2Icon className='w-12 h-12' />
              )
            }
          </div>
          <div className='w-2/3'>
            <h2 className='text-xl font-semibold'>{user?.name}</h2>
            <p className='text-sm text-muted-foreground'>{user?.username}</p>
          </div>
          <EditProfileDialog user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;