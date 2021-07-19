import React from 'react'

export default class Grid extends React.Component {
    render () {
        return (
            <svg width={this.props.width ?? 24} height={this.props.height ?? 24} viewBox="0 0 24 24" style={this.props.style} className={this.props.className}>
                <path fill="currentColor" d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
            </svg>
        )
    }
}
