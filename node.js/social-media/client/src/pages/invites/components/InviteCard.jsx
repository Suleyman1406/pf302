import { Button } from '@/components/ui/button';
import { sendFollowRequest } from '@/services/invites';
import { selectUser } from '@/store/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

const InviteCard = ({ invite }) => {
  const [requestStatus, setRequestStatus] = useState('');

  const handleAcceptRequest = async () => {
    try {
      const data = await axios.patch(`${BASE_URL}/invite/${invite._id}/accept`, {}, { withCredentials: true });
      setRequestStatus('Accepted');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      const data = await axios.patch(`${BASE_URL}/invite/${invite._id}/reject`, {}, { withCredentials: true });
      setRequestStatus('Rejected');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center gap-5">

        {/* <Avatar user={user} /> */}
        <Avatar invite={invite} />
        <div className="ml-4">
          <p className="font-semibold">{invite.sender.username}</p>
        </div>
        <div>
          {
            requestStatus ? <p className={cn('text-white', requestStatus === 'Accepted' ? 'bg-green-400 p-2 rounded-md' : 'bg-red-400 p-2 rounded-md')}>{requestStatus}</p>
              : (
                <>
                  <Button
                    onClick={handleAcceptRequest}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={handleRejectRequest}
                    variant={'destructive'}
                  >
                    Reject
                  </Button>
                </>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
