import React from 'react';
import './switch.styles.css';

class Switch extends React.Component {
    render() {
        const {on, className='', ...props} = this.props;
        const btnClassName = [
            'toggle-btn',
            on ? 'toggle-btn-on' : 'toggle-btn-off',
        ]
            .filter(Boolean)
            .join(' ')
        return (
            <div>
                <input
                    className="toggle-input"
                    type="checkbox"
                    checked={on}
                    onChanged={() => {

                    }}
                />
                <button
                    className={btnClassName}
                    aria-label="Toggle"
                    {...props}
                />
            </div>
        );
    }
}

export { Switch };