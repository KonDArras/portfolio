# Meter

Skill meter: a name and mono level over a 5px track filled with a `live`→`signal` gradient; omit `load` for a dashed idle track.

Used in the Stack section's monitor cards. The source maps levels to loads: expert 96, advanced 84, certified associate 90, certified 100, intermediate 62, cert pending 45. In the site the fill animates in on reveal and then 'breathes'; this component renders the settled state.

Hand-written from `SkillRow` in `src/pages/Home.jsx`.
