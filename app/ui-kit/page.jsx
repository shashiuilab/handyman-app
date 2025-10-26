export default function UIKITPage() {
    return (
      <div className="space-y-10">
        {/* Typography */}
        <section className="section">
          <h1 className="text-3xl font-bold mb-2">Typography</h1>
          <p className="text-text-muted mb-4">Preview of global font styles and text hierarchy</p>
  
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <h2 className="text-2xl font-semibold">Heading 2</h2>
            <h3 className="text-xl font-medium">Heading 3</h3>
            <p className="text-base">Body text example — clean, legible, and consistent.</p>
            <p className="text-sm text-text-muted">Muted small text for descriptions.</p>
          </div>
        </section>
  
        {/* Buttons */}
        <section className="section">
          <h1 className="text-2xl font-bold mb-4">Buttons</h1>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary</button>
            <button className="btn-secondary">Secondary</button>
            <button className="btn-primary opacity-70 cursor-not-allowed">Disabled</button>
          </div>
        </section>
  
        {/* Inputs */}
        <section className="section">
          <h1 className="text-2xl font-bold mb-4">Inputs</h1>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold">Text Input</label>
              <input type="text" placeholder="Enter text here" />
            </div>
  
            <div>
              <label className="block mb-1 font-semibold">Select Input</label>
              <select>
                <option>Select option</option>
                <option>Option A</option>
                <option>Option B</option>
              </select>
            </div>
  
            <div className="sm:col-span-2">
              <label className="block mb-1 font-semibold">Textarea</label>
              <textarea rows="3" placeholder="Enter message here"></textarea>
            </div>
          </div>
        </section>
  
        {/* Cards */}
        <section className="section">
          <h1 className="text-2xl font-bold mb-4">Cards</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card">
              <h3 className="font-semibold mb-2">Card Title</h3>
              <p className="text-text-muted text-sm mb-3">
                A simple example of a reusable card component.
              </p>
              <button className="btn-primary">Action</button>
            </div>
  
            <div className="card">
              <h3 className="font-semibold mb-2">Another Card</h3>
              <p className="text-text-muted text-sm mb-3">
                Cards are used to group related information.
              </p>
              <button className="btn-secondary">Cancel</button>
            </div>
          </div>
        </section>
  
        {/* Spacing & Colors */}
        <section className="section">
          <h1 className="text-2xl font-bold mb-4">Color Palette</h1>
          <div className="flex flex-wrap gap-4">
            <div className="w-24 h-24 bg-brand rounded-lg shadow-sm flex items-center justify-center text-white font-medium">Brand</div>
            <div className="w-24 h-24 bg-brand-light rounded-lg shadow-sm flex items-center justify-center text-white font-medium">Light</div>
            <div className="w-24 h-24 bg-brand-dark rounded-lg shadow-sm flex items-center justify-center text-white font-medium">Dark</div>
            <div className="w-24 h-24 bg-accent rounded-lg shadow-sm flex items-center justify-center text-white font-medium">Accent</div>
            <div className="w-24 h-24 bg-background rounded-lg shadow-sm flex items-center justify-center text-sm">Background</div>
            <div className="w-24 h-24 bg-surface rounded-lg shadow-sm flex items-center justify-center text-sm">Surface</div>
          </div>
        </section>
      </div>
    );
  }
  