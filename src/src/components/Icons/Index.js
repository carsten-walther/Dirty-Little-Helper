import React from 'react'

export default class Index extends React.Component {
    render () {
        return (
            <svg width={this.props.width ?? 24} height={this.props.height ?? 24} viewBox="0 0 24 24" style={this.props.style} className={this.props.className}>
                <path fill="currentColor" d="M2 5c-.55 0-1 .45-1 1v15c0 1.1.9 2 2 2h15c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1-.45-1-1V6c0-.55-.45-1-1-1zm19-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-1 16H8c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/>
            </svg>
        )
    }
}
