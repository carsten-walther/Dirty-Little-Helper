import React from 'react'

export default class Info extends React.Component {
    render () {
        return (
            <svg width={this.props.width ?? 24} height={this.props.height ?? 24} viewBox="0 0 24 24" style={this.props.style} className={this.props.className}>
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z"/>
            </svg>
        )
    }
}
