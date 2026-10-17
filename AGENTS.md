<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep theme audio playback in the dedicated ThemeMusic component; attempt autoplay and retry on user interaction because browsers may block audible autoplay.
- Keep event schedule values in the shared event-details module so display and schedule tests use one source of truth.
- Keep pointer illumination in the dedicated CursorLight component with non-interactive overlay styling; disable it for touch and reduced motion to preserve accessibility and page controls.
- Keep How To Play media and descriptions in the shared how-to-play module; the dedicated section component owns popup state and one-shot sound playback so closing always stops sound.
- Keep concrete match rules in the shared how-to-play module with adjacent rule tests so timing and victory conditions remain verifiable.
