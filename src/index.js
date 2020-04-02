import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
    <div>
        <div>
            {JSON.stringify(window && window.location, null, '  ')}
        </div>
        <br/>
        <div>
            {JSON.stringify(window.TelegramGameProxy && window.TelegramGameProxy.initParams, null, ' ')}
        </div>
    </div>
), document.getElementById('root'));
