import React from 'react'

export default class Grid extends React.Component {
    render () {
        return (
            <svg width={this.props.width ?? 24} height={this.props.height ?? 24} viewBox="0 0 24 24" style={this.props.style} className={this.props.className}>
                <path fill="currentColor" d="M11 18h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1zm-6 0h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1zM16 6v11c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z"/>
            </svg>
        )
    }
}
