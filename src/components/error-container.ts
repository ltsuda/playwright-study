import { ComponentObject } from "../abstracts"

export class ErrorContainer extends ComponentObject {
    public readonly errorMessage = this.host.getByTestId("error-text")
    public readonly close = this.host.getByTestId("button-close-error")
}
