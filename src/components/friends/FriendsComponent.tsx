import FindPeopleComponent from './FindPeopleComponent.tsx';
import FriendListComponent from './FriendListComponent.tsx'
import RequestsToMeListComponent from './RequestsToMeListComponent.tsx';
import React from 'react';

export default function FriendsComponent() {
    return (
        <div className="friends">
            <FindPeopleComponent />
            <RequestsToMeListComponent />
            <FriendListComponent />
        </div>
    );
}