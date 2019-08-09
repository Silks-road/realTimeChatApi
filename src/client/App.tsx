import { withAuth } from "@okta/okta-react";
import { Map } from "immutable";
import React, { SyntheticEvent, useEffect, useState } from "react";
import io from "socket.io-client";

import { useAuth } from "./auth";
import MessageList from "./Messagelist";
import NewMessage from "./NewMessage";

const socket = io(location.origin);

export default withAuth(({ auth }) => {
    const [ authenticated, user, token ] = useAuth();
    const [ socket, setSocket ] = useState(null);

    useEffect(() => {
      const newSocket = io(location.origin, token && { query: { token } });
      setSocket(newSocket);
      return () => newSocket.close();
    }, [ token ]);

    return socket && (
      <div>
        {user ? (
          <div>
            Signed in as { user.name }
            <button onClick={ () => auth.logout() }>Sign Out</button>
          </div>
        ) : (
          <div>
            Not Signed in
            <button onClick={ () => auth.login() }>Sign In</button>
          </div>
        )}
        <MessageList socket={ socket }/>
        <NewMessage socket={ socket }/>
      </div>
    )
});
