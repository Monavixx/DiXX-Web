import FindPeopleComponent from './FindPeopleComponent.jsx';
import FriendListComponent from './FriendListComponent.jsx'

export default function FriendsComponent() {
    return (
        <div className="friends">
            <FindPeopleComponent />
            <FriendListComponent />
        </div>
    );
}