import type { Component } from 'vue'

export interface BaseButtonProps {
    disabled: boolean,
    small: boolean,
    text: string,
    method: (payload: MouseEvent) => void,
    icon: Component
}